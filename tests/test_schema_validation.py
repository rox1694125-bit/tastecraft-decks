from __future__ import annotations

import importlib.util
import io
import sys
import unittest
from contextlib import redirect_stdout
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def load_script(name: str):
    path = ROOT / "scripts" / f"{name}.py"
    spec = importlib.util.spec_from_file_location(name, path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Could not load {path}")
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


schema_examples = load_script("validate_schema_examples")


class SchemaValidationTests(unittest.TestCase):
    def test_valid_demo_samples_pass(self) -> None:
        with redirect_stdout(io.StringIO()):
            result = schema_examples.main(["--root", str(ROOT)])
        self.assertEqual(result, 0)

    def test_schema_subset_rejects_bad_const_and_extra_property(self) -> None:
        schema = {
            "type": "object",
            "required": ["schema_version"],
            "additionalProperties": False,
            "properties": {
                "schema_version": {"type": "string", "const": "1.0"},
            },
        }
        errors = schema_examples.validate_instance({"schema_version": "2.0", "extra": True}, schema)
        self.assertIn("$: unexpected property 'extra'", errors)
        self.assertIn("$.schema_version: expected constant '1.0', got '2.0'", errors)

    def test_schema_subset_rejects_bool_as_integer(self) -> None:
        schema = {"type": "integer"}
        self.assertEqual(schema_examples.validate_instance(True, schema), ["$: expected ['integer'], got boolean"])


if __name__ == "__main__":
    unittest.main()
