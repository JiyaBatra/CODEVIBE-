# data_loader.py
import threading

# Module-level cache globals (fix for issue #940)
_projects_cache = None
_cache_lock = threading.Lock()


def load_projects():
    global _projects_cache, _cache_lock
    with _cache_lock:
        if _projects_cache is not None:
            return _projects_cache
        # Load projects data
        _projects_cache = []
        return _projects_cache


def clear_cache():
    global _projects_cache, _cache_lock
    with _cache_lock:
        _projects_cache = None
