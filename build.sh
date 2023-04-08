yarn docs:build
cp /Users/dolphilia/Documents/github/dolphilia.github.io/docs/CNAME /Users/dolphilia/Documents/github/dolphilia.github.io
rsync -av --delete --progress /Users/dolphilia/Documents/github/dolphilia.com/docs/.vitepress/dist/ /Users/dolphilia/Documents/github/dolphilia.github.io/docs/
cp /Users/dolphilia/Documents/github/dolphilia.github.io/CNAME /Users/dolphilia/Documents/github/dolphilia.github.io/docs 
