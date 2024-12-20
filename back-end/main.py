from fastapi import FastAPI
import requests
from bs4 import BeautifulSoup
from fastapi.middleware.cors import CORSMiddleware
#from googlesearch import search

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# sites pour des activités d'aventure
url_1 = "https://henoo.fr/blog/10-escapades-a-faire-autour-de-montpellier/"
url_2 = "https://generationvoyage.fr/autour-montpellier-faire-voir/"

# sites pour des activité sportives
url_3 = "https://afmontpellier.fr/activites-sportives/"
url_4 = "https://www.entre2nature.fr/fr/les-activites-de-pleine-nature-autour-de-montpellier/"

# site pour les activités culturels
url_5 = "https://www.sitesdexception.fr/que-visiter-dans-lherault-les-sites-incontournables/"



culture_site  = requests.get(url_5)
activity_liste = []

if culture_site.ok:
    curlture_content = culture_site.text
    soup = BeautifulSoup(curlture_content, "html5lib")
    container_culture_activity_div = soup.find_all("div", class_ = "fusion-fullwidth")
    for div in container_culture_activity_div:
        culture_h3 = div.find("h3")
        culture_desc = div.find_all("p")
        a_tag = div.find("a")
        img_tag = div.find("img")
        #culture_p = culture_desc.find_all("p")
        if culture_h3 is not None and a_tag is not None and img_tag is not None:
            description_texts = " ".join([p.get_text(strip=True) for p in culture_desc])
            # recupérer le href de la balise a
            link = a_tag.get("href")
            #récupérer le lien de l'image dans la balise
            img = img_tag.get('src')
            culture_activity = {
                "title" : culture_h3.get_text(strip=True),
                "description" : description_texts,
                "link" : link,
                "img" : img,
                "category" : 'culture'
            }
            activity_liste.append(culture_activity)




@app.get(('/'))
def get_all_activities():
    return activity_liste

@app.get(("/title/{title}"))
def get_activity_by_title(title):
    for activity in activity_liste:
        activity_title = activity['title'].replace(" ", "")
        if activity_title == title:
            return activity
    return 'activity not found'

@app.get('/categories/{category}')
async def get_list_activity_by_category(category):
    category_activity_list = []
    for activity in activity_liste:
        if activity['category'] == category:
            category_activity_list.append(activity)
    return category_activity_list


#sites = []
#for url in search("activités culturels à faire près de Montpellier site:.fr", num_results=10, lang='fr'):
#    sites.append(url)

#print(sites)