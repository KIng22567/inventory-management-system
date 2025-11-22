import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface Response {
  error: { msg: string };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    role: string
  ) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, SetUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      SetUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({email,password}),
      });

      const data = await (async () => {
        try {
          return await res.json();
        } catch {
          return null;
        }
      })();

      if (!res.ok) {
        const msg =
          data?.message ||
          (data?.errors && data.errors[0]?.msg) ||
          res.statusText ||
          "Login failed";

        throw new Error(msg);
      }
      if (data?.user) {
        console.log(data.user);
        SetUser(data.user);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
    } catch (err: unknown) {
      if (err instanceof Error) throw err;
      throw new Error("Login failed");
    }
  };

  const register = async (
    fullname: string,
    email: string,
    password: string,
    role: string
  ) => {
    try {
      const res = await fetch("http://localhost:5000/auth/register", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ fullname, email, password, role }),
      });

      const data = await (async () => {
        try {
          return await res.json();
        } catch {
          return null;
        }
      })();

      if (!res.ok) {
        const msg =
          data?.message ||
          (data?.errors && data.errors[0]?.msg) ||
          res.statusText ||
          "Registration failed";
        throw new Error(msg);
      }

      if (data?.user) {
        console.log(data.user);
        SetUser(data.user);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
    } catch (err: unknown) {
      if (err instanceof Error) throw err;
      throw new Error("Registration failed");
    }
  };

  const logout = () => {
    SetUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };
  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useAuth must be within an AuthProvider");

  return context;
}
