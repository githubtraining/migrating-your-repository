## Step 1: Plan the migration

Migrating your repository to GitHub gives you the feature-rich tools and collaboration needed to elevate your project to the next level. This course will guide you through the necessary steps to migrate your repository from another version control system to GitHub.

I know some people like to get straight to the point while others like more information. For those who like more information, be sure to check out the drop-downs like this one :arrow_down:

<details>
  <summary>Why move to GitHub?</summary>
  <hr>

  ### Why move to GitHub?

  You may be wondering what this GitHub thing is all about and why you should use it. If this sounds like you, here are a few reasons to make GitHub your project's new home:

  - **Version control** — Everything on GitHub is stored in [Git](http://git-scm.com), the best version control system around. Version control allows you to experiment and make mistakes in code without messing up your final product.
  - **Keep your code in one place** — Whether you work on multiple computers or just want to get some important projects off your computer, GitHub is the perfect place to store your projects online.
  - **Collaboration** — Once your code is on GitHub, you can invite others to work on your code with you, share it with the world, or send a link to a friend to help you debug a problem.

  <hr>
</details>

### Important considerations for migrations

If you are moving from another version control system such as Mercurial, Subversion, or another Git platform, you will need to make a few decisions:

1. Do you need all of the history?
2. Is there project data that lives outside of the history you need to preserve? (ex: Issues, Discussions, Pull Requests)

#### Should you keep all of the history?

If you are moving your project to GitHub as a public project, you may want to consider what is in your history. For example:

- Is there sensitive information in historical commit <sup>[:book:](https://help.github.com/articles/github-glossary/#commit)</sup> messages?
- Do you want to use [private email addresses](https://help.github.com/articles/setting-your-commit-email-address-on-github/) on GitHub?

| If ... | Then ... |
| ------- | --------- |
| If you do want to keep the history | Check out the **Using the GitHub Importer** section under Next steps.|
| If you do **not** want all of this history | We recommend you do a clean cutover to "restart" version control and remove any unwanted history. If this sounds like the right option for you, check out the **Doing a clean cutover** section under Next steps. |

#### Should you keep non-Git data?

Mapping users, keeping commit comments, and other data migrations are more complex, but not impossible. For most version control systems there are helpful Open Source <sup>[:book:](https://help.github.com/articles/github-glossary/#open-source)</sup> tools available. Here are a few resources:

  - [GitHub's documentation on importing from other VCS](https://help.github.com/en/enterprise/admin/migrations/importing-data-from-third-party-version-control-systems)
  - [Blog post about GitHub Migrator tool](https://github.com/blog/2110-migrate-your-code-with-the-github-importer)

### Other scenarios

<details>
  <summary>Your project is on another site not using version control, such as CodePen or Glitch</summary>
  <hr>

  ### Moving your project from another site not using version control

  If you are moving your project from a site not using version control, such as CodePen or Glitch, the steps are a bit different that migrating your project from a source that is using version control. Because of this, we have a dedicated course for uploading your local project to GitHub. If this is your situation, please join the [Uploading your local project to GitHub](https://lab.github.com/githubtraining/uploading-your-project-to-github) course to learn how to handle your case.

  <hr>
</details>

<details>
  <summary>Your project is already on your local machine</summary>
  <hr>

  ### Your project is already on your local machine

  :sparkles: Terrific! @{{ user.username}} since you already have the project locally, you are _almost_ ready to move it to GitHub.

  But, this course guides you through the necessary steps to migrate your repository from another version control system unto GitHub. Since your project is already on your local machine, you need slightly different instructions. Please join the [Uploading your local project to GitHub]({{ host }}/courses/uploading-your-local-project) course to learn how to handle your case.

  <hr>
</details>

### :keyboard: Activity: Next steps

Choose the drop-down below that best fits your current situation.

If you don't have a repository to use for this activity, you are welcome to use this one: https://github.com/githubtraining/github-move


<details>
  <summary>Using the GitHub Importer</summary>
  <hr>

  ### Using the GitHub Importer

  GitHub has a terrific import tool that will allow you to import your repository in just a few minutes.

  First, let's make sure your repository <sup>[:book:](https://help.github.com/articles/github-glossary/#repository)</sup> is Git friendly. **Close this issue** and I will open a new issue with next steps.

  <hr>
</details>

<details>
  <summary>Doing a clean cutover</summary>
  <hr>

  ### Doing a clean cutover

  To do a clean cutover, you will need to remove the existing history. Some people like to save a back up of the project with the history. To start the process:

  1. Download a copy of the project to your local machine.
  1. Remove version control (with Git this is as simple as running `rm -rf .git` inside the repository).
  1. Now that your project is local on your machine and you have removed any history being tracked by Git, the remaining steps in this course largely cover migrating that Git history. Since you just removed that aspect of your project, please join the [Uploading your local project to GitHub]({{ host }}/courses/uploading-your-local-project) course to see the next steps to upload your local project to GitHub.

  <hr>
</details>

<details>
  <summary>Migrating non-Git data</summary>
  <hr>

  ### Migrating non-Git data

  These migrations are more nuanced and outside the scope of this course. I recommend you go through these steps with a simple repository so you can learn best practices and then apply them to your more complex migration.

  <hr>
</details>

### Ready to move on?

**Close this issue to signal you are finished with this step**. I will open a new issue to show you how to optimize your repository for Git operations. :tada:

<hr>
<h3 align="center">Watch below for my response</h3>

> :robot: I'm waiting for you to close the issue before moving on.

> _Sometimes I respond too fast for the page to update! If you perform an expected action and don't see a response from me, wait a few seconds and refresh the page for your next steps._
