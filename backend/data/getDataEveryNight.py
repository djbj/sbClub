import urllib
import xml.etree.ElementTree as ET

# SBXML = "https://www.systembolaget.se/api/assortment/stock/xml"

SBXML = "/User"
while True:
    print ("START fetching xml Butiker")
    # acct = raw_input('Enter Twitter Account:')
    # if ( len(acct) < 1 ) : break
    url = SBXML
    print 'Retrieving', url
    document = urllib.urlopen (url).read()
    print 'Retrieved', len(document), 'characters.'
    tree = ET.fromstring(document)
    count = 0
    for name in tree.findall('Namn'):
        count = count + 1
        if count > 24 : break
        print name.find('Namn: ').text
        status =  name.find('text')
        if status :
            txt = status.find('text').text
            print '  ',txt[:50]
