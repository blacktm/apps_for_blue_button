# Engine (engine.rb)

class Engine
  
  def self.get_app(app_name)
    # Lookup and load the app workflow
    app_path = 'apps/' + app_name + '.json'

    if File.file?(app_path)
      app = JSON.parse( File.open(app_path, 'r') { |f| f.read } )
    else
      return "Error: App does not exist."
    end
    
    # Append the app data
    app['data'] = {}
    # Set app workflow to the first action
    app['next'] = 0
    
    return app
   end
  
  def self.run_app(app)
    # Iterate through actions until complete
    while app['actions'][app['next']] != nil
      # If it's a UI element, return to the client
      if app['actions'][app['next']]['name'].slice(0, 2) == 'ui'
        return { :status => 'ui', :app => app }
      else
        run_action(app)
      end
    end
    
    # App has completed
    return { :status => 'done' }
  end
  
  def self.run_action(app)
    current_action = app['actions'][app['next']]
    
    # Lookup action
    action_path = "actions/#{current_action['name']}.rb"
    
    if File.file?(action_path)
      require action_path
      eval('Actions::' + current_action['name'].upcase + '.run(app)')
    else
      puts "Error: Action does not exist."
    end
    
    # Move pointer to the next action
    app['next'] += 1
  end
end
