#!groovy

@Library('cib-pipeline-library') _

import de.cib.pipeline.library.Constants

standardNPMPipeline(
    primaryBranch: 'main',
    npmCredentialsId: Constants.CIBSEVEN_NPM_CREDENTIALS_ID,
    npmDevRegistry: Constants.CIBSEVEN_NPM_REGISTRY_DEV_URL,
    npmReleaseRegistry: Constants.CIBSEVEN_NPM_REGISTRY_RELEASE_URL
)