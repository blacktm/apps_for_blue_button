# Blue Button to Vitals (blue_button_to_vitals.rb)
# Description:
#   Converts parsed Blue Button data to a neutral vitals format.

module Actions
  class BLUE_BUTTON_TO_VITALS
    def self.run(app)
      
      app['data'] = JSON.parse(app['data'])
      app['data'] = app['data']['VITALS AND READINGS']['Reading']
      
    end
  end
end
