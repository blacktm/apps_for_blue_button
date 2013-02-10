# Blue Button to Medications (blue_button_to_medications.rb)
# Description:
#   Converts parsed Blue Button data to a neutral medications format.

module Actions
  class BLUE_BUTTON_TO_MEDICATIONS
    def self.run(app)
      
      app['data'] = JSON.parse(app['data'])
      app['data'] = app['data']['VA MEDICATION HISTORY']['Medications']
      
    end
  end
end
