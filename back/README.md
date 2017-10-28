# backend

## Install

```
yum -y install poppler poppler-utils poppler-data
# Install RVM here
rvm install 2.3 && rvm use 2.3 --default
gem install bundle
bundle install
RACK_ENV=production bundle exec rake db:migrate
```

## Run

```
RACK_ENV=production bundle exec rackup -D
```
