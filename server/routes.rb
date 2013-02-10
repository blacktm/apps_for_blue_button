# Routes (routes.rb)

require 'json'

# Pages

get '/' do
	redirect 'http://www.blacktm.com/'
end

get '/bluebutton/?' do
  erb :'browse/bluebutton', :layout => :'layouts/main'
end

# Application views

get '/bluebutton/:name' do
  erb :bluebutton
end

# Services

post '/' do
  req = JSON.parse(request.body.read)
  response = Services.dispatcher(req)
  response.to_json
end
