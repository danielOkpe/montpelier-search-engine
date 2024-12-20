from fastapi import FastAPI
import requests
from bs4 import BeautifulSoup
from fastapi.middleware.cors import CORSMiddleware
import random
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
url_2 = "https://generationvoyage.fr/autour-montpellier-faire-voir/"

# sites pour des activité sportives
url_3 = "https://afmontpellier.fr/activites-sportives/"

# site pour les activités culturels
url_5 = "https://www.sitesdexception.fr/que-visiter-dans-lherault-les-sites-incontournables/"

activity_list = []

def scrape():

    culture_site  = requests.get(url_5)
    sport_site = requests.get(url_3)
    adventure_site  = requests.get(url_2)


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
                activity_list.append(culture_activity)


    if sport_site.ok:
        sport_content = sport_site.text
        soup = BeautifulSoup(sport_content, "html5lib")
        container_sport_activity = soup.find_all("section", class_ = "row")
        for section in container_sport_activity:
            sport_h2 = section.find("h2")
            sport_desc = section.find_all("p")
            img_tag = section.find("img")
            if sport_h2 is not None and img_tag is not None:
                description_texts = " ".join([p.get_text(strip=True) for p in sport_desc])
                # recupérer le href de la balise a
                #link = a_tag.get("href")
                #récupérer le lien de l'image dans la balise
                img = img_tag.get('data-src-webp')
                sport_activity = {
                    "title" : sport_h2.get_text(strip=True),
                    "description" : description_texts,
                    "link" : '',
                    "img" : img,
                    "category" : 'sport'
                }
                activity_list.append(sport_activity)

    if adventure_site.ok:
        adventure_content = adventure_site.text
        soup = BeautifulSoup(adventure_content, "html5lib")
        container_adventure_activity_div = soup.find("div", class_ = "p402_premium")

        adventure_title_list = []
        adventure_desc_list = []
        adventure_img_list = []

        adventure_title_list_tag = container_adventure_activity_div.find_all("h2")
        for adventure_title in adventure_title_list_tag:
            adventure_title_list.append(adventure_title.get_text(strip=True))
        adventure_desc_list_tag = container_adventure_activity_div.find_all("p")
        for adventure_desc in adventure_desc_list_tag:
            adventure_desc_list.append(adventure_desc.get_text(strip=True))
        adventure_img_list_tag = container_adventure_activity_div.find_all("img")
        for adventure_img in adventure_img_list_tag:
            adventure_img_list.append(adventure_img.get('src'))


        for  i in range(len(adventure_title_list) - 1):
           adventure_activity = {
                        "title" : adventure_title_list[i],
                        "description" : adventure_desc_list[i],
                        "link" : '',
                        "img" : adventure_img_list[i],
                        "category" : 'adventure'
                        }
           activity_list.append(adventure_activity)
    random.shuffle(activity_list)

@app.get(('/'))
def get_all_activities():
    scrape()
    return activity_list

@app.get(("/title/{title}"))
def get_activity_by_title(title):
    for activity in activity_list:
        activity_title = activity['title'].replace(" ", "")
        if activity_title == title:
            return activity
    return 'activity not found'

@app.get('/categories/{category}')
async def get_list_activity_by_category(category):
    category_activity_list = []
    for activity in activity_list:
        if activity['category'] == category:
            category_activity_list.append(activity)
    return category_activity_list


#sites = []
#for url in search("activités culturels à faire près de Montpellier site:.fr", num_results=10, lang='fr'):
#    sites.append(url)

#print(sites)