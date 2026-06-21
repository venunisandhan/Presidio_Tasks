import { describe, it, expect, beforeEach } from 'vitest';
import { getCookie, setCookie, deleteCookie } from './cookies';

describe('Cookie Utilities', () => {
  beforeEach(() => {
    // Clear all cookies before each test
    document.cookie.split(';').forEach((c) => {
      document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });
  });

  it('should set and get a cookie correctly', () => {
    setCookie('test_cookie', 'hello_world');
    const value = getCookie('test_cookie');
    expect(value).toBe('hello_world');
  });

  it('should return an empty string for non-existent cookies', () => {
    const value = getCookie('non_existent');
    expect(value).toBe('');
  });

  it('should delete a cookie correctly', () => {
    setCookie('to_delete', 'value123');
    expect(getCookie('to_delete')).toBe('value123');
    
    deleteCookie('to_delete');
    expect(getCookie('to_delete')).toBe('');
  });
});
