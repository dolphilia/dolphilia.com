#!/bin/bash
yarn docs:build
cp /Users/dolphilia/github/dolphilia.github.io/docs/CNAME /Users/dolphilia/github/dolphilia.github.io
rsync -av --delete --progress /Users/dolphilia/github/dolphilia.com/docs/.vitepress/dist/ /Users/dolphilia/github/dolphilia.github.io/docs/
cp /Users/dolphilia/github/dolphilia.github.io/CNAME /Users/dolphilia/github/dolphilia.github.io/docs 
