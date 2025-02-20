require 'base64'
require 'yaml'
require 'csv'

module Jekyll
  class DataInjector < Generator
    safe true
    priority :high

    def generate(site)
      # Read environment variables
      sky_data = ENV['SKY_DATA']
      songs_data = ENV['SONGS_DATA']

      # Decode and parse CSV/YAML
      if sky_data
        csv_content = Base64.decode64(sky_data)
        site.data['skysheets'] = CSV.parse(csv_content, headers: true).map(&:to_h)
      end

      if songs_data
        yml_content = Base64.decode64(songs_data)
        site.data['songs'] = YAML.safe_load(yml_content)
      end
    end
  end
end
