# Services (services.rb)

class Services
  def self.dispatcher(request)
    case request['service']
    when 'run_app'
      Engine.run_app(request['app'])
    else
      return { :status => "Error: Service does not exist." }
    end
  end
end
