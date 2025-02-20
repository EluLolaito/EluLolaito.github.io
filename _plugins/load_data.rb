require 'base64'
require 'yaml'
require 'csv'

module Jekyll
  class DataInjector < Generator
    safe true
    priority :high

    def generate(site)
      sky_data = ENV['SKY_DATA']
      songs_data = ENV['SONGS_DATA']

      if sky_data
        csv_content = Base64.decode64(sky_data)
        site.data['skysheets'] = CSV.parse(csv_content, headers: true).map(&:to_h)
        puts "✅ Injected skysheets with #{site.data['skysheets'].size} rows."
      else
        puts "❌ SKY_DATA is empty."
      end

      if songs_data
        yml_content = Base64.decode64(songs_data)
        site.data['songs'] = YAML.safe_load(yml_content)
        puts "✅ Injected songs with #{site.data['songs'].keys.size} entries."
      else
        puts "❌ SONGS_DATA is empty."
      end
    end
  end
end
