#!groovy

@Library('cib-pipeline-library@npm') _

import de.cib.pipeline.library.Constants
import de.cib.pipeline.library.ConstantsInternal

standardNPMPipeline(
    primaryBranch: 'main',
    uiParamPresets: [
        'UNIT_TESTS': true
    ],
    testResultsPattern: ConstantsInternal.MAVEN_TEST_RESULTS,
    npmCredentialsId: Constants.CIBSEVEN_NPM_CREDENTIALS_ID,
    npmDevRegistry: Constants.CIBSEVEN_NPM_REGISTRY_DEV_URL,
    npmReleaseRegistry: Constants.CIBSEVEN_NPM_REGISTRY_RELEASE_URL
)