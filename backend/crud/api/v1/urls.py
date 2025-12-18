from rest_framework.routers import DefaultRouter
from .views import ItemViewSet
from django.urls import path

app_name = 'crud-api-v1'

router = DefaultRouter()
router.register(r'item', ItemViewSet)

# urlpatterns = [
#     path('blog/publish/', BlogPublishView.as_view()),
#     path('blog/details/<slug:slug>/', BlogDetailsView.as_view()),
# ]

urlpatterns = router.urls
