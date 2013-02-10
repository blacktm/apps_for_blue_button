# Helpers (helpers.rb)

helpers do
  
  def javascript_include_tag(script)
    "<script src='#{script}'></script>"
  end
  
  def img_asset(file)
    "/img/#{file}"
  end
  
  def js_asset(file)
    "<script src='/js/#{file}'></script>"
  end
  
end
