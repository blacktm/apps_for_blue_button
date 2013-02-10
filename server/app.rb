# App Server (app.rb)

require 'sinatra'
require 'sinatra/reloader' if development?

# Modeler includes
$LOAD_PATH << './'
require 'models'
require 'helpers'
require 'services'
require 'engine'
require 'routes'
