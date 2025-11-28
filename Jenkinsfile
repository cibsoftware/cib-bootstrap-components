#!groovy

@Library('cib-pipeline-library@npm') _

import de.cib.pipeline.library.Constants

standardNPMPipeline(
    primaryBranch: 'main',
    npmCredentialsId: Constants.CIBSEVEN_NPM_CREDENTIALS_ID,
    npmDevRegistry: Constants.CIBSEVEN_NPM_REGISTRY_RELEASE_URL,
    npmReleaseRegistry: Constants.CIBSEVEN_NPM_REGISTRY_RELEASE_URL
)