#!/bin/bash

ruby build.rb manifest.json

cd server/

echo -e "\nAdding to Git..."
git add .
git status
git commit -a -m "Updates"

echo -e "\nPushing to Heroku..."
git push heroku master

echo -e "\nDone!\n"

# heroku logs --tail
