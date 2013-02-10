# Blue Button to Labs (blue_button_to_labs.rb)
# Description:
#   Converts parsed Blue Button data to a neutral lab format.

module Actions
  class BLUE_BUTTON_TO_LABS
    def self.run(app)
      
      app['data'] = JSON.parse(app['data'])
      
      labs = {}
      
      app['data'] = app['data']['VITALS AND READINGS']['Reading'].select {|i| i["Measurement Type"] == "Cholesterol" }
      
      # Converts the one-item array to a Hash
      app['data'] = Hash[*app['data']]
      
      labs[:chol] = app['data']['Total cholesterol']
      labs[:tg] = app['data']['TG']
      labs[:ldl] = app['data']['LDL']
      labs[:hdl] = app['data']['HDL']
      
      app['data'] = labs
      
    end
  end
end
