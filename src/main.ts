import * as core from '@actions/core'
import * as github from '@actions/github'

async function run(): Promise<void> {
  try {
    const token = core.getInput('token')
    const octokit = github.getOctokit(token)
    const environment = core.getInput('env')
    const context = github.context

    const request = await octokit.rest.repos.listDeployments({
      ...context.repo,
      environment
    })

    const deployments = request.data

    if (deployments.length > 0) {
      const deploymentObject = JSON.stringify(deployments, null, 4)
      // eslint-disable-next-line no-console
      console.log(`DEBUG1`)

      // eslint-disable-next-line no-console
      console.log(`Deployments: ${deploymentObject}`)

      core.setOutput('deployment_url', deployments[0].url.toString())
      core.setOutput('deployment_id', deployments[0].id.toString())
      core.setOutput('deployment_node_id', deployments[0].node_id.toString())
      core.setOutput('deployment_sha', deployments[0].sha.toString())
      core.setOutput('deployment_ref', deployments[0].ref.toString())
      core.setOutput('deployment_task', deployments[0].task.toString())
      core.setOutput('deployment_payload', deployments[0].payload.toString())
      core.setOutput(
        'deployment_environment',
        deployments[0].environment.toString()
      )
      if (deployments[0].description) {
        core.setOutput(
          'deployment_description',
          deployments[0].description.toString()
        )
      }
      if (deployments[0].creator) {
        core.setOutput(
          'deployment_creator_login',
          deployments[0].creator.login.toString()
        )
      }
      if (deployments[0].creator) {
        core.setOutput(
          'deployment_creator_id',
          deployments[0].creator.id.toString()
        )
      }
      core.setOutput(
        'deployment_created_at',
        deployments[0].created_at.toString()
      )
      core.setOutput(
        'deployment_updated_at',
        deployments[0].updated_at.toString()
      )
      core.setOutput(
        'deployment_statuses_url',
        deployments[0].statuses_url.toString()
      )
      core.setOutput(
        'deployment_repository_url',
        deployments[0].repository_url.toString()
      )
      if (deployments[0].transient_environment) {
        core.setOutput(
          'deployment_transient_environment',
          deployments[0].transient_environment.toString()
        )
      }
      if (deployments[0].production_environment) {
        core.setOutput(
          'deployment_production_environment',
          deployments[0].production_environment.toString()
        )
      }
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}
run()
