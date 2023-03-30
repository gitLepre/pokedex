import os
import requests

# Create directory to store the images
folder_path = os.path.join(os.path.expanduser('~'), 'Desktop', 'pokemons')
os.makedirs(folder_path, exist_ok=True)

# Download and save images
for i in range(1, 899):
    url = f'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/{str(i).zfill(3)}.png'
    response = requests.get(url)
    if response.status_code == 200:
        file_path = os.path.join(folder_path, f'{str(i).zfill(3)}.png')
        with open(file_path, 'wb') as f:
            f.write(response.content)
        print(f'Successfully downloaded {url} to {file_path}')
    else:
        print(f'Error downloading {url}')