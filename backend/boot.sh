#!/bin/sh
yarn install
yarn migrate-prod
exec yarn start-prod