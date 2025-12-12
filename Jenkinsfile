#!groovy

@Library('cib-pipeline-library@npm-dependencyTrackSynchronous') _

import de.cib.pipeline.library.Constants
import de.cib.pipeline.library.ConstantsInternal

standardNPMPipeline(
    primaryBranch: 'PR-23',

    // Auto enable unit test and SAST
    uiParamPresets: [
        'UNIT_TESTS': true,
        'SAST': true
    ],

    // Test configuration
    testResultsPattern: ConstantsInternal.MAVEN_TEST_RESULTS,
    coverageCoberturaPattern: 'target/coverage/cobertura-coverage.xml',
    coverageLcovPattern: 'target/coverage/lcov.info',

    // Publish configuration
    npmCredentialsId: Constants.CIBSEVEN_NPM_CREDENTIALS_ID,
    npmDevRegistry: Constants.CIBSEVEN_NPM_REGISTRY_DEV_URL,
    npmReleaseRegistry: Constants.CIBSEVEN_NPM_REGISTRY_RELEASE_URL
)
