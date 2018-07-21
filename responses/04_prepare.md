## Step 2: Prepare the project

### Working with Binary files

In general, there are two types of files: text files and binary files.

Text files, like most code files, are easily tracked with Git <sup>[:book:](https://help.github.com/articles/github-glossary/#git)</sup> and are very lightweight.

However, binary files like spreadsheets, presentations with slides, and videos don't work well with Git. If your repository already has some of these files, it's best to have a plan in place before you enable Git version control.

You could choose to remove the binary files, or use another tool like [git-lfs](https://git-lfs.github.com/) (Git Large File Storage). We won't get into detail on how to set up git-lfs in this course, but we will talk about `.gitignore` files next, which are key to protecting your code from becoming bloated with binaries.

### Add a `.gitignore`

As we convert your project to a Git repository, it should only include the source code necessary to build or compile your project. In addition to avoiding binaries as we discussed above, you will also want to keep build artifacts out of your version controlled code. 

To do this, you will create a file in your current project named `.gitignore`. Git will use the `.gitignore` to determine which files and directories should not be tracked under version control. The [`.gitignore` file](https://help.github.com/articles/ignoring-files/) is stored in your repository in order to share the ignore rules with any other users that interact with the repository. 

Since the files to be ignored are dependent on the language you are using, the open source community has contributed some great templates for `.gitignore` files in the [`github/gitignore`](https://github.com/github/gitignore) repository.

### :keyboard: Activity: Prepare your repository

1. Remove any binary files from your repository.
1. In your local environment, [create a `.gitignore` file](https://help.github.com/articles/ignoring-files/). You can use a [template](https://github.com/github/gitignore) or create your own.

> When you are finished, close this issue. I will open a new issue with the next steps. :tada:

<hr>
<h3 align="center">Watch below for my response</h3>

> :robot: I'm waiting for you to close this issue before moving on.
