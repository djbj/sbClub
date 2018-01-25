import urllib2
import xmltodict

def homepage(request):
    file = urllib2.urlopen('https://www.systembolaget.se/api/assortment/stores/xml')
    data = file.read()
    file.close()

    data = xmltodict.parse(data)
    return render_to_response('my_template.html', {'data': data})
