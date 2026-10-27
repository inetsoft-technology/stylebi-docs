"""Shared helpers for the documentation checks.

All checks use only the Python standard library so they run anywhere
(locally or in GitHub Actions) without installing packages.
"""
import fnmatch
import os
import re
from dataclasses import dataclass, field

DOCS_COMPONENT = "InetSoftUserDocumentation"


@dataclass
class Finding:
    """One problem reported by a check."""
    check: str          # check id, e.g. "chartapi"
    key: str            # stable id used by exceptions.txt, e.g. a page file name
    where: str          # file the problem is in, relative to the docs modules dir
    message: str        # what is wrong
    category: str = ""  # optional grouping within the check


@dataclass
class CheckResult:
    check: str
    title: str
    checked: int = 0                      # number of items verified OK
    findings: list = field(default_factory=list)
    notes: list = field(default_factory=list)   # informational lines


def modules_dir(docs_root):
    return os.path.join(docs_root, DOCS_COMPONENT, "modules")


def read_text(path):
    with open(path, encoding="utf-8-sig", errors="replace") as f:
        return f.read().replace("\r\n", "\n")


def iter_adoc(docs_root, module=None):
    """Yield (relative path, text) for .adoc files under the modules dir."""
    base = modules_dir(docs_root)
    top = os.path.join(base, module) if module else base
    for dirpath, _, files in os.walk(top):
        for name in sorted(files):
            if name.endswith(".adoc"):
                full = os.path.join(dirpath, name)
                yield os.path.relpath(full, base).replace(os.sep, "/"), read_text(full)


def page_title(text):
    for line in text.split("\n"):
        line = line.strip().lstrip("﻿")
        if line.startswith("= "):
            return line[2:].strip()
        if line and not line.startswith(("//", ":")):
            break
    return None


def load_exceptions(path):
    """Read exceptions.txt: lines of 'check | docs-branch-or-* | key  # reason'."""
    rules = []
    if not os.path.exists(path):
        return rules
    for raw in read_text(path).split("\n"):
        line = raw.split("#", 1)[0].strip()
        if not line:
            continue
        parts = [p.strip() for p in line.split("|")]
        if len(parts) == 3:
            rules.append(tuple(parts))
    return rules


def is_excepted(finding, rules, docs_branch):
    """A rule's key may use * and ? wildcards, e.g. 'missing-page:*'."""
    for check, branch, key in rules:
        if (check == finding.check and fnmatch.fnmatchcase(finding.key, key)
                and branch in ("*", docs_branch)):
            return True
    return False


def strip_java_comments(src):
    src = re.sub(r"/\*.*?\*/", "", src, flags=re.S)
    return re.sub(r"//[^\n]*", "", src)
