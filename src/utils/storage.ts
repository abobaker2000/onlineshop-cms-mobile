// eslint-disable-next-line import/no-extraneous-dependencies
import AsyncStorage from '@react-native-async-storage/async-storage';

export class LocalStorage {
	private _JWT = '';
	private _TENANT_ID = '';

	public get JWT() {
	  if (!this._JWT) {
		this.getItem('JWT');
	  }
	  return this._JWT;
	}

	public get TENANT_ID() {
	  if (!this._TENANT_ID) {
		this.getItem('JWT');
	  }
	  return this._TENANT_ID;
	}


	public async setItem(key: string, value: string) {
		try {
			await AsyncStorage.setItem(key, value);
		} catch (error) {
			console.log(error);
		}
	}

	public async getItem(key: string) {
		try {
		  const value = await AsyncStorage.getItem(key);
		  if (value !== null) {
			if (key === 'JWT') {
			  this._JWT = value;
			} else if (key === 'TENANT_ID') {
			  this._TENANT_ID = value;
			}
		  }
		} catch (error) {
		  console.log(error, 'aa');
		}
	  }

	public async removeItem(key: string) {
		try {
			await AsyncStorage.removeItem(key);
		} catch (error) {
			console.log(error);
		}
	}
}

export const localStorage = new LocalStorage();
