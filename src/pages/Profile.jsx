export default function Profile() {
    const dispatch = useDispatch();
    const {} = useSelector(() => {
    
    })
    const [form, setForm] = useState({
        avatar: '',
        username: '',
        email: '',
        role: '',
        bio: '',
        insuranceDoc: '',
        licenceDoc: ''
    }) 
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            username,
            email,
            role,
            bio,
            avatar,
            insuranceDoc,
            licenceDoc
        }
        console.log(formData);
    }
    
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name] : e.target.value });
    }
    
    return(
        <div>
        <h2>Admin Profile Page</h2>
        <SidebarProvider>
           <AppSidebar />
           <main className="p-4">
              <form onSubmit={handleSubmit}>
            <div>
                <input type="text"
                        name="username"
                        placeholder="Enter Username"
                        value={form.username}
                        onChange={handleChange}    
                />
            </div>
            <div>
                <input type="text"
                        name="email"
                        placeholder="Enter Email"
                        value={form.email}
                        onChange={handleChange}
                />
            </div>
            <div>
                <input type="text"
                        name="bio"
                        placeholder="Enter bio"
                        value={form.bio}
                        onChange={handleChange}    
                />
            </div>
            <div>
                <input type=""
                        name="insuranceDoc"
                        placeholder="upload your insurance"
                        value={form.insuranceDoc}
                        onChange={handleChange}
                />
            </div>
            <div>
                <input type=""
                        name="licenceDoc"
                        placeholder="upload your licence"
                        value={form.licenceDoc}
                        onChange={handleChange}
                />
            </div>
        </form>
           </main>
       </SidebarProvider>
        </div>
    )
}