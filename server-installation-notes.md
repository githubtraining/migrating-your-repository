## GitHub Enterprise Server (GHES) installation notes

✅ | This course is compatible with supported versions* of GHES.
--- | ---

*Supported versions of GHES are visible by using the drop-down in the [official documentation](https://help.github.com/enterprise/).

### Course dependencies

The following are dependencies of the course. The course may continue to work without these dependencies, but learners won't experience the course as designed.

| Dependency                                                                                                               | Required? | Reason                                                                                                                                           | Alternative                                                                                                                                                                                    |
|--------------------------------------------------------------------------------------------------------------------------|-----------|--------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| GHES must be able to reach githubusercontent.com                                                                         | Yes       | Images used throughout the course are served from this domain. Learners will find broken images required to take the course without this access. | Manually download the images referenced in the `responses/` folder, upload them to an accessible domain, and replace the images in the `responses/` folder.                                    |
| Learner must be able to reach github.com and outside web                                                                 | No        | Links are provided to resources that live on the outside web.                                                                                    | Without access to resources on the outside web, learners will reach blocked resources. You can change the links to these resources in the `responses/` folder, and in the template repository. |
