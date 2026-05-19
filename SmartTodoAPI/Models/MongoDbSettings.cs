namespace SmartTodoAPI.Models
{
    public class MongoDbSettings
    {
        public string ConnectionString { get; set; } = "mongodb://TODOdb:todo@ac-eunatmm-shard-00-00.tie90jv.mongodb.net:27017,ac-eunatmm-shard-00-01.tie90jv.mongodb.net:27017,ac-eunatmm-shard-00-02.tie90jv.mongodb.net:27017/?ssl=true&replicaSet=atlas-vfbgad-shard-0&authSource=admin&appName=Todolis";
        public string DatabaseName { get; set; } = "TODOdb";
        public string CollectionName { get; set; } = "Tasks";
    }
}
