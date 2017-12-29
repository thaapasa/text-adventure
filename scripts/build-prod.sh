#!/bin/bash

TARGET_DIR=/var/www/seikkailut.pomeranssi.fi/html
BUILD_DIR=./build

pushd . >/dev/null 2>&1

cd `dirname $0`/..

echo 'Fetching changes from git...'
git pull || exit -1

echo 'Building app...'
npm run build || exit -1

echo 'Deploying app'
rm -rf $TARGET_DIR/*
cp -rf $BUILD_DIR/* $TARGET_DIR/

echo 'Done'

popd >/dev/null 2>&1
