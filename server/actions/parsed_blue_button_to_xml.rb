# Parsed Blue Button to XML (parsed_blue_button_to_xml.rb)

module Actions
  class PARSED_BLUE_BUTTON_TO_XML
    def self.run(app)
      
      require 'builder'
      
      app['data'] = JSON.parse(app['data'])
      
      builder = Builder::XmlMarkup.new
      app['data'] = builder.blue_button(app['data'])
      
      app['data'] = "<inspect/>\n<blue_button Measurement Type=\"Blood pressure\" Date=\"02 Aug 2010\" Time=\"1720\" Systolic=\"130\" Diastolic=\"76\" Comments=\"BP taken lying down\"/>\n"
      
    end
  end
end

