#!/bin/bash

ruby build.rb manifest.json --dev

cd server/

ruby app.rb
