#!/bin/bash

ionic build
rm -rf android
ionic cap add android
ionic cap copy
ionic cap sync
#cordova-res android --skip-config --copy
ionic cap open android