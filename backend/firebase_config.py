# firebase_config.py
import firebase_admin
from firebase_admin import credentials, storage

cred = credentials.Certificate("mocapgasapp-firebase-adminsdk-5ad5k-b61ffe9fb6.json")
firebase_admin.initialize_app(cred, {
     'apiKey': "AIzaSyAXw-y7DYse8kQokrA2KL0gWYTS9A2DQWs",
  'authDomain': "mocapgasapp.firebaseapp.com",
  'projectId': "mocapgasapp",
  'storageBucket': "mocapgasapp.appspot.com",
  'messagingSenderId': "553099519942",
  'appId': "1:553099519942:web:986e0db3cd52948319f4c7",
  'measurementId': "G-BR905FZ581"
})

bucket = storage.bucket()
