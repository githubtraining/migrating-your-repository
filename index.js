module.exports = course => {
  course.before(async context => {
    await context.github.issues.createLabel(context.repo({
      name: 'migration',
      color: '5319e7'
    }))

    await context.github.issues.createLabel(context.repo({
      name: 'local',
      color: 'ed8285'
    }))

    await context.github.issues.createLabel(context.repo({
      name: 'other',
      color: '93edb1'
    }))

    return context.newIssue({
      title: 'Planning the move to GitHub',
      body: context.fromFile('01_make-a-plan.md')
    })
  })

  course.on('plan-the-move', async context => {
    if (context.payload.issue.title !== 'Planning the move to GitHub' && (context.payload.action === 'closed' || context.payload.action === 'labeled')) {
      await context.respond(context.fromFile('e_generic.md'))
      return false
    }

    if (context.payload.action === 'closed') {
      const otherLabel = context.payload.issue.labels.find(label => label.name === 'other')

      if (otherLabel || !context.payload.issue.labels.length) {
        await context.github.issues.edit(context.repo({
          number: context.payload.issue.number,
          labels: ['local']
        }))

        if (!context.payload.issue.labels.length) await context.respond(context.fromFile('03_need-labels.md'))
      }

      const prepareIssue = await context.newIssue({
        title: 'Preparing the project for Git',
        body: context.fromFile(`04_prepare.md`)
      })

      course.log(`created a new issue at ${prepareIssue.html_url}`)

      return context.respond(context.fromFile(`02_next.md`, { issueURL: prepareIssue.html_url }))
    } else if (context.payload.action === 'labeled') {
    // if label is `migration`
      course.log(`a label was added`)
      if (context.payload.label.name === 'migration') {
        course.log(`migration added`)
        await context.respond(context.fromFile(`02_make-a-plan-vcs.md`))
      }
      // comment: 02_make-a-plan-vcs.md
      // if label is `local`
      if (context.payload.label.name === 'local') {
        course.log(`local added`)
        await context.respond(context.fromFile(`02_make-a-plan-local.md`))
      }
      // comment: 02_make-a-plan-local.md
      // if label is `other`
      if (context.payload.label.name === 'other') {
        course.log(`other added`)
        await context.respond(context.fromFile(`02_make-a-plan-other.md`))
      }
    }
    return false
  })

  course.on('prepare-the-project', async context => {
    // TODO abstract relevant issue/pr titles into app steps
    /* in the config, we should be able to specify a specific issue/pr
     * title that will link the step and the issue/pr. Therefore, the step
     * will only be triggered when the event comes from that  particular
     * issue/pr.
     *
     * 👇 should replace this kind of check
     */
    if (context.payload.issue.title !== 'Preparing the project for Git') {
      await context.respond(context.fromFile('e_generic.md'))
      return false
    }

    const issues = await context.github.issues.getForRepo(context.repo({
      state: 'all'
    }))
    const firstIssue = issues.data.find(issue => issue.title === 'Planning the move to GitHub')

    course.log(`looking for first issue, number: ${firstIssue.number}`)

    if (firstIssue) {
      course.log(`the labels: ${JSON.stringify(firstIssue.labels)}`)

      const localLabel = firstIssue.labels.find(label => label.name === 'local')
      const migrationLabel = firstIssue.labels.find(label => label.name === 'migration')

      if (localLabel) {
        course.log(`Found a local label`)
        const moveLocalIssue = await context.newIssue({
          title: 'Publishing your local project',
          body: context.fromFile(`05_move-local.md`, {url: `https://github.com/${context.user.username}/${context.payload.repository.name}.git`})
        })

        await context.respond(context.fromFile(`04_next.md`, { issueURL: moveLocalIssue.html_url }))

        if (migrationLabel) {
          await context.github.issues.createComment(context.repo({
            number: moveLocalIssue.number,
            body: context.fromFile(`05_move-both.md`)
          }))

          await context.github.issues.createComment(context.repo({
            number: moveLocalIssue.number,
            body: context.fromFile(`05_move-import.md`)
          }))
        }
        return true
      } else if (migrationLabel) {
        course.log(`Found a migration label`)
        const importIssue = await context.newIssue({
          title: 'Importing your project',
          body: context.fromFile(`05_move-import.md`)
        })

        return context.respond(context.fromFile(`04_next.md`, { issueURL: importIssue.html_url }))
      }
    }

    return false
    // if `local` label was on original issue
    // new issue: title; "Publishing your Local Project", content; 05_move-local.md
    // if `migration` label was on original issue
    // new issue: title; "Importing your Project", content: 05_move-import.md
    // if `local` & `migration`
    // new issue: title; "Publishing your Project", content; 05_move-both.md
    // comment in issue: 05_move-import.md
  })

  course.on('make-the-move', async context => {
    course.log(`Looking for a .gitignore`)

    const issues = await context.github.issues.getForRepo(context.repo({
      state: 'all'
    }))

    let publishIssue

    if (!(publishIssue = issues.data.find(issue => issue.title === 'Importing your project'))) publishIssue = issues.data.find(issue => issue.title === 'Publishing your local project')

    try {
      await context.github.repos.getContent(context.repo({
        path: '.gitignore'
      }))
    } catch (e) {
      if (e.code === 404) {
        // respond by saying that gitignore isn't found
        course.log('No .gitignore')

        await context.github.issues.createComment(context.repo({
          number: publishIssue.number,
          body: context.fromFile('e_needs_gitignore.md')
        }))
      } else {
        course.log(`Got some error: ${e}`)
        return false
      }
    }

    let communityProfile
    if (!context.payload.repository.private) {
      communityProfile = await context.github.repos.getCommunityProfileMetrics({
        owner: context.repo().owner,
        name: context.repo().repo
      })
    }

    const tree = (await context.github.gitdata.getTree(context.repo({ sha: context.payload.head_commit.id }))).data.tree

    const communityMilestone = await context.github.issues.createMilestone(context.repo({
      title: 'Community check'
    }))

    let communityIssue
    if (communityProfile) {
      communityIssue = await context.newIssue(context.repo({
        title: 'About your community score',
        body: context.fromFile('about-community.md', {
          health_percentage: communityProfile.data.health_percentage,
          community_url: `https://github.com/${context.user.username}/${context.payload.repository.name}/community`,
          milestoneURL: communityMilestone.data.html_url
        })
      }))
    } else {
      communityIssue = await context.newIssue(context.repo({
        title: 'About your community score',
        body: context.fromFile('making-collaboration-easier.md', {milestoneURL: communityMilestone.data.html_url})
      }))
    }

    if (!context.payload.repository.description) {
      await context.newIssue(context.repo({
        title: 'Add a repository description',
        body: context.fromFile('08_collabs-description-new.md', { private: context.payload.repository.private }),
        milestone: communityMilestone.data.number
      }))
    }

    if (!tree.some(f => f.path === 'README.md')) {
      await context.newIssue(context.repo({
        title: 'Add a README',
        body: context.fromFile('08_collabs-README-new.md', { private: context.payload.repository.private }),
        milestone: communityMilestone.data.number
      }))
    }

    if (!tree.some(f => f.path.includes('CODE_OF_CONDUCT.md'))) {
      await context.newIssue(context.repo({
        title: 'Add a Code of Conduct',
        body: context.fromFile('08_collabs-code-new.md', { private: context.payload.repository.private }),
        milestone: communityMilestone.data.number
      }))
    }

    if (!tree.some(f => f.path.includes('CONTRIBUTING.md'))) {
      await context.newIssue(context.repo({
        title: 'Add a contributing guide',
        body: context.fromFile('08_collabs-contributing-new.md', { private: context.payload.repository.private }),
        milestone: communityMilestone.data.number
      }))
    }

    if (!tree.some(f => f.path.includes('LICENSE'))) {
      await context.newIssue(context.repo({
        title: 'Add a license',
        body: context.fromFile('08_collabs-license-new.md', { private: context.payload.repository.private }),
        milestone: communityMilestone.data.number
      }))
    }

    if (!tree.some(f => f.path.includes('ISSUE_TEMPLATE.md')) && !tree.some(f => f.path.includes('PULL_REQUEST_TEMPLATE.md'))) {
      await context.newIssue(context.repo({
        title: 'Add an issue or PR template',
        body: context.fromFile('08_collabs-templates-new.md', { private: context.payload.repository.private }),
        milestone: communityMilestone.data.number
      }))
    }

    await context.github.issues.edit(context.repo({
      number: publishIssue.number,
      state: 'closed'
    }))

    return context.github.issues.createComment(context.repo({
      number: publishIssue.number,
      body: context.fromFile(`06_move-done-local.md`, {url: communityIssue.html_url})
    }))
  })

  course.on('prepare-to-collaborate', async context => {
    if (context.payload.issue.title !== 'About your community score') return false

    const settingsMilestone = await context.github.issues.createMilestone(context.repo({
      title: 'Project settings check'
    }))

    const settingsIssue = await context.newIssue(context.repo({
      title: 'Your repository settings',
      body: context.fromFile('07_settings.md', context.repo({milestoneURL: settingsMilestone.data.html_url}))
    }))

    await context.newIssue(context.repo({
      title: 'Confirm your repository visibility',
      body: context.fromFile('07_confirm-visibility.md', {visibility: (context.payload.repository.private ? 'private' : 'public')}),
      milestone: settingsMilestone.data.number
    }))

    await context.newIssue(context.repo({
      title: 'Invite collaborators',
      body: context.fromFile('07_invite-collaborators.md', context.repo()),
      milestone: settingsMilestone.data.number
    }))

    await context.newIssue(context.repo({
      title: 'Set up protected branches',
      body: context.fromFile('07_protected-branches.md', context.repo()),
      milestone: settingsMilestone.data.number
    }))

    await context.newIssue(context.repo({
      title: 'Set up integrations',
      body: context.fromFile('07_integrations.md'),
      milestone: settingsMilestone.data.number
    }))

    return context.respond(context.fromFile('02_next.md', {issueURL: settingsIssue.html_url}))
  })

  course.on('project-settings', async context => {
    if (context.payload.issue.title !== 'Your repository settings') return false

    const docIssue = await context.newIssue(context.repo({
      title: 'Add documentation',
      body: context.fromFile('10_users-documentation.md', context.repo())
    }))

    const releaseIssue = await context.newIssue(context.repo({
      title: 'Release your software',
      body: context.fromFile('11_users-releases.md')
    }))

    const goodbyeIssue = await context.newIssue(context.repo({
      title: 'A few parting words',
      body: context.fromFile('12_graceful-exit.md', {issue1: docIssue.html_url, issue2: releaseIssue.html_url})
    }))

    return context.respond(context.fromFile('02_next.md', {issueURL: goodbyeIssue.html_url}))
  })

  // course.on('document-your-project', async context => {
  //   // create new issue: title; "Adding Documentation to your project", body; 10_users-documentation.md
  // })
  // course.on('release-your-software', async context => {
  //   // new issue: title; "Creating your first release", body; 11_users-releases.md
  // })
}
