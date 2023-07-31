Simple React App with Apache Superset embedded dashboards
<br>Based on this documentation: https://www.npmjs.com/package/@superset-ui/embedded-sdk?activeTab=readme

For embedding dashboards you need to implement these options to your superset-config.py:
```
FEATURE_FLAGS = {..., "EMBEDDED_SUPERSET": True}
# Dashboard embedding
GUEST_ROLE_NAME = "Gamma"
GUEST_TOKEN_JWT_SECRET = "your-secret"
GUEST_TOKEN_JWT_ALGO = "HS256"
GUEST_TOKEN_HEADER_NAME = "X-GuestToken"
GUEST_TOKEN_JWT_EXP_SECONDS = 300  # 5 minutes
WTF_CSRF_ENABLED = False
ENABLE_CORS = True
```
And provide some changes to App.js.
You may need to switch your superset to HTTPS instead of HTTP if you want to use your dashboards on HTTPS sites.

How it look like with manual sizing. This is generated iframe:
![picture](https://github.com/vddenis/apache-superset-embedded-sdk/assets/79063405/6e924933-dd18-482d-aef3-33cb0dacb87d)

