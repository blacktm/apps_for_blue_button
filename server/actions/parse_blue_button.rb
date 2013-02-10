# Parse Blue Button Data (parse_blue_button.rb)

module Actions
  class PARSE_BLUE_BUTTON
    def self.run(app)
      
      require 'uri'
      require 'blue_button_parser'
      
      bb_text = URI.decode(app['data'])
      
      bb_parsed = BlueButtonParser.new(bb_text)
      app['data'] = bb_parsed.data.to_json
      
    end
  end
end

