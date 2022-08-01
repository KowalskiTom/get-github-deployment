# Get GitHub Deployment

[![build-test](https://github.com/KowalskiTom/get-github-deployment/actions/workflows/test.yml/badge.svg)](https://github.com/KowalskiTom/get-github-deployment/actions/workflows/test.yml)

`get-github-deployment` is a [GitHub Action](https://github.com/features/actions) for retrieving information regarding a specific [GitHub deployment](https://docs.github.com/en/rest/reference/deployments) and outputting for use by other actions. Currently the action supports getting the latest deployment. If you would like to see support for other use cases, please create an issue.

example:

```yml
on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Get Deployment
        uses: KowalskiTom/get-github-deployment@v1
        id: getDeployment
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          env: staging
      - run: echo "steps.getDeployment.outputs.deployment_id ${{ steps.getDeployment.outputs.deployment_id }}"
```

## Inputs

| Variable | Default | Description                                                              |
| -------- | ------- | ------------------------------------------------------------------------ |
| `token`  |         | provide your `${{ secrets.GITHUB_TOKEN }}` for API access                |
| `env`    |         | identifier for environment to deploy to (e.g. `staging`, `prod`, `main`) |

## Outputs

| Variable                            | Description                                                                                                           |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `deployment_url`                    | Deployment URL                                                                                                        |
| `deployment_id`                     | Unique identifier of the deployment                                                                                   |
| `deployment_node_id`                | Node that executed the deployment                                                                                     |
| `deployment_sha`                    | Commit SHA                                                                                                            |
| `deployment_ref`                    | The ref to deploy. This can be a branch, tag, or sha.                                                                 |
| `deployment_task`                   | Parameter speciffing the task that was execute, example 'deploy'                                                      |
| `deployment_payload`                | JSON payload with extra information about the deployment                                                              |
| `deployment_environment`            | Name for the target deployment environment                                                                            |
| `deployment_description`            | Short description of the deployment                                                                                   |
| `deployment_creator_login`          | Username that triggered the deployment                                                                                |
| `deployment_creator_id`             | Id of the user that triggered the deployment                                                                          |
| `deployment_created_at`             | The date-time the deployment was created                                                                              |
| `deployment_updated_at`             | The date-time the deployment was last updated                                                                         |
| `deployment_statuses_url`           | URL to the deployment status                                                                                          |
| `deployment_repository_url`         | URL to the repository                                                                                                 |
| `deployment_transient_environment`  | Specifies if the given environment is specific to the deployment and will no longer exist at some point in the future |
| `deployment_production_environment` | Specifies if the given environment is one that end-users directly interact with                                       |
