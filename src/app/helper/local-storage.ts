export class LocalStorage {
  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  get(key: string) {
    try {
        return JSON.parse(localStorage.getItem("user") || "")[key];
    } catch (error) {
        return null
    }

  }

  getAuthDetl(){
    return {
      name: this.get("name"),
      email: this.get("email"),
      token: this.get("token")
    }
  }

  isValidToken() {
    const isExpired = this.get('exp') < new Date().getTime()
    return !isExpired && this.get('token') != null && this.get('token') != ''
  }

  delete(key: string) {
    localStorage.removeItem(key);
  }

  clearAll(){
    localStorage.clear()
  }
}
