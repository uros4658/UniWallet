using AppHack.Models;
using FireSharp.Config;
using FireSharp.Interfaces;
using FireSharp.Response;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace AppHack.Controllers
{
    public class DBController : Controller
    {
        IFirebaseConfig config = new FirebaseConfig
        {
            AuthSecret = "aDGoPHGjDwVmGJOG3MAeeS6aF2TeTbWinOC2lVrA",
            BasePath = "https://uniwallet-9bb58-default-rtdb.europe-west1.firebasedatabase.app"
        };
        IFirebaseClient client;

        [HttpPost("NoIDea")]
        public IActionResult Create(UserDto userdto)
        {
            try
            {
                client = new FireSharp.FirebaseClient(config);
                var data = userdto;
                PushResponse response = client.Push("Users/", data);
                data.Email = response.Result.name;
                SetResponse setResponse = client.Set("Users/" + data.Email, data);

                if (setResponse.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    ModelState.AddModelError(string.Empty, "Added Succesfully");
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Something went wrong!!");
                }
            }
            catch (Exception ex)
            {

                ModelState.AddModelError(string.Empty, ex.Message);
            }

            return View();
        }

        public ActionResult Index()
        {
            client = new FireSharp.FirebaseClient(config);
            FirebaseResponse response = client.Get("Users");
            dynamic data = JsonConvert.DeserializeObject<dynamic>(response.Body);
            var list = new List<UserDto>();
            if (data != null)
            {
                foreach (var item in data)
                {
                    list.Add(JsonConvert.DeserializeObject<UserDto>(((JProperty)item).Value.ToString()));
                }
            }

            return View(list);
        }

        [HttpPost("EditUserWithUser")]
        public ActionResult Edit(UserDto user)
        {
            client = new FireSharp.FirebaseClient(config);
            SetResponse response = client.Set("Users/" + user.Email, user);
            return RedirectToAction("Index");
        }

        [HttpPost("kurac")]
        public ActionResult Test()
        {
            return RedirectToAction("Index");
        }

        [HttpGet("EditUserWithID")]
        public ActionResult Edit(string id)
        {
            client = new FireSharp.FirebaseClient(config);
            FirebaseResponse response = client.Get("Users/" + id);
            UserDto data = JsonConvert.DeserializeObject<UserDto>(response.Body);
            return View(data);
        }

        public ActionResult Delete(string id)
        {
            client = new FireSharp.FirebaseClient(config);
            FirebaseResponse response = client.Delete("Users/" + id);
            return RedirectToAction("Index");
        }

    }
}
