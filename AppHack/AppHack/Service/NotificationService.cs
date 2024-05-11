using FirebaseAdmin;
using FirebaseAdmin.Messaging;

public class NotificationService
{
    private readonly FirebaseMessaging _messaging;

    public NotificationService(FirebaseApp app)
    {
        _messaging = FirebaseMessaging.GetMessaging(app);
    }

    public async Task SendNotification(string title, string body, string token)
    {
        var message = new Message()
        {
            Notification = new Notification()
            {
                Title = title,
                Body = body
            },
            Token = token
        };

        await _messaging.SendAsync(message);
    }
}
