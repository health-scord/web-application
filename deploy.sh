#!/bin/bash
echo ${TRAVIS_JOB_NUMBER}
echo ${TRAVIS_TAG}
echo "tagging docker image"
VERSION=`grep '"version":' package.json | sed 's/.*: "//' | sed 's/",//'`
echo "${DOCKER_PASSWORD}" | docker login -u "${DOCKER_USERNAME}" --password-stdin ${DOCKER_REGISTRY}
echo ${DOCKER_REGISTRY}
echo ${DOCKER_USERNAME}
docker tag web-application ${DOCKER_REGISTRY}/${DOCKER_USERNAME}/web-application:${VERSION}
docker tag web-application ${DOCKER_REGISTRY}/${DOCKER_USERNAME}/web-application:latest
echo "pushing docker image"
docker push ${DOCKER_REGISTRY}/${DOCKER_USERNAME}/web-application:${VERSION}
docker push ${DOCKER_REGISTRY}/${DOCKER_USERNAME}/web-application:latest