#!/bin/sh
yarn install
yarn migrate
exec yarn start-prod