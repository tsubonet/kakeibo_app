FROM ruby:2.5.0
ENV LANG C.UTF-8
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev
RUN curl -sL https://deb.nodesource.com/setup_9.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g npm
RUN npm install -g yarn
RUN gem install bundler
WORKDIR /tmp
ADD Gemfile Gemfile
ADD Gemfile.lock Gemfile.lock
RUN bundle install
ENV APP_HOME /kakeibo
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME
ADD . $APP_HOME
