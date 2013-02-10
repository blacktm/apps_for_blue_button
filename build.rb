#!/usr/bin/env ruby

require 'json'

def build(manifest)
  
  # Start compilation
  print "\nBuilding \"#{manifest[:build_name]}\" "
  
  if manifest[:dev_mode]
    puts "(Development Mode)\n"
  else
    puts "(Production Mode)\n"
  end
  
  # The final build containing all the JS
  js_build = ""
  
  puts "  Adding Scripts"
  
  # Example:
  #   "java -jar compiler.jar --js hi.js --js_output_file hi.min.js"
  compiler_cmd = "java -jar #{manifest[:compiler_path]}compiler.jar "
  
  manifest[:scripts].each do |js_file|
    print "    #{js_file}.js\n"
    compiler_cmd << "--js #{manifest[:scripts_path]}#{js_file}.js "
  end
  
  print "\n  Compiling..."
  
  js_build << manifest[:copyright]
  
  if manifest[:dev_mode]
    compiler_cmd << "--compilation_level WHITESPACE_ONLY " <<
                    "--formatting PRETTY_PRINT"
  else
    # Add a closure
    js_build << "\n(function () {\n"
  end
  
  result = IO.popen(compiler_cmd)
  js_build << result.readlines.join
  
  # Close up the closure
  if !manifest[:dev_mode] then js_build << "})(#{manifest[:import]});" end
  
  File.open("#{manifest[:build_path]}#{manifest[:build_filename]}", "w") { |f| f.puts(js_build) }
  
  print "done (#{manifest[:build_path]}#{manifest[:build_filename]}).\n"
end

class Hash
  def symbolize_keys
    keys.each do |key|
      self[(key.to_sym rescue key) || key] = delete(key)
    end
    self
  end
end

# Running file directly
if __FILE__ == $0
  
  if File.file? ARGV[0]
    manifest = File.open(ARGV[0], "r") { |f| f.read }
    manifest = JSON.parse(manifest).symbolize_keys
  else
    puts "\e[0;31mBuild file does not exist. Quitting...\e[0m"
    exit
  end
  
  if ARGV[1] == "--dev"
    manifest[:dev_mode] = true
  else
    manifest[:dev_mode] = false
  end
  
  ##############################################################################
  # Start the build process
  
  # Start the timer
  beginning = Time.now
  
  build(manifest)
  
  t_elapsed = (Time.now - beginning).round(2)
  puts "\n\e[1;32mBuild completed in #{t_elapsed} seconds.\e[0m\n\n"
  
end
