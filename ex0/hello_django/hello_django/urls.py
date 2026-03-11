from django.contrib import admin
from django.urls import path
from django.conf.urls import include  # 確保有引入 include




urlpatterns = [
    path('admin/', admin.site.urls),]
urlpatterns += [
    path('myhello/', include('myhello.urls')), # 網址會是 127.0.0.1:8000/myhello/
]